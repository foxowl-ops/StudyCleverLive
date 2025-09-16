import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2 } from "lucide-react";
import { icons } from 'lucide-react';

const iconNames = Object.keys(icons);

const gradients = [
  'from-purple-500 to-blue-600',
  'from-green-500 to-emerald-600',
  'from-orange-500 to-red-600',
  'from-pink-500 to-rose-500',
  'from-cyan-500 to-teal-500',
  'from-indigo-500 to-violet-500',
];

const getRandomGradient = () => gradients[Math.floor(Math.random() * gradients.length)];

import { fetchApi } from "@/lib/api";

// Types
type Domain = { id: string; name: string; description: string; icon: string; color: string };
type Content = { id: string; domain_id: string; type: 'article' | 'video' | 'news'; title: string; url: string; description: string };

// Domain Form
const DomainForm = ({ onSubmit, initialData, onFinished }) => {
  const [formData, setFormData] = useState(() => ({
    ...(initialData || { name: '', description: '', icon: '' }),
    color: getRandomGradient(),
  }));
  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
  const handleIconChange = (value) => setFormData({ ...formData, icon: value });
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); onFinished(); };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input id="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <Textarea id="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <Select onValueChange={handleIconChange} value={formData.icon}>
        <SelectTrigger><SelectValue placeholder="Select an icon" /></SelectTrigger>
        <SelectContent>
          {iconNames.map(iconName => (
            <SelectItem key={iconName} value={iconName}>{iconName}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DialogFooter><DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose><Button type="submit">Save</Button></DialogFooter>
    </form>
  );
};

// Content Form
const ContentForm = ({ onSubmit, initialData, domainId, onFinished }) => {
  const [formData, setFormData] = useState(initialData || { title: '', url: '', description: '', type: 'article' });
  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
  const handleSelectChange = (value) => setFormData({ ...formData, type: value });
  const handleSubmit = (e) => { e.preventDefault(); onSubmit({ ...formData, domain_id: domainId }); onFinished(); };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input id="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
      <Input id="url" value={formData.url} onChange={handleChange} placeholder="URL" required />
      <Textarea id="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <Select onValueChange={handleSelectChange} defaultValue={formData.type}>
        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="article">Article</SelectItem>
          <SelectItem value="video">Video</SelectItem>
          <SelectItem value="news">News</SelectItem>
        </SelectContent>
      </Select>
      <DialogFooter><DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose><Button type="submit">Save</Button></DialogFooter>
    </form>
  );
};

const AdminPage = () => {
  const queryClient = useQueryClient();
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null);
  const [domainModal, setDomainModal] = useState({ open: false, data: null });
  const [contentModal, setContentModal] = useState({ open: false, data: null });

  // Queries
  const { data: domains, isLoading: domainsLoading } = useQuery<Domain[]>({ queryKey: ['domains'], queryFn: () => fetchApi('/api/domains') });
  const { data: content, isLoading: contentLoading } = useQuery<Content[]>({ queryKey: ['content', selectedDomainId], queryFn: () => fetchApi(`/api/domains/${selectedDomainId}/content`), enabled: !!selectedDomainId });

  const selectedDomain = domains?.find(d => d.id === selectedDomainId);

  // Mutations
  const createDomain = useMutation({ mutationFn: (data: Omit<Domain, 'id'>) => fetchApi('/api/admin/domains', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['domains'] }) });
  const updateDomain = useMutation({ mutationFn: (data: Domain) => fetchApi(`/api/admin/domains/${data.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['domains'] }) });
  const deleteDomain = useMutation({ mutationFn: (id: string) => fetchApi(`/api/admin/domains/${id}`, { method: 'DELETE' }), onSuccess: () => { setSelectedDomainId(null); queryClient.invalidateQueries({ queryKey: ['domains'] }); } });
  const createContent = useMutation({ mutationFn: (data: Omit<Content, 'id'>) => fetchApi('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['content', selectedDomainId] }) });
  const updateContent = useMutation({ mutationFn: (data: Content) => fetchApi(`/api/admin/content/${data.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['content', selectedDomainId] }) });
  const deleteContent = useMutation({ mutationFn: (id: string) => fetchApi(`/api/admin/content/${id}`, { method: 'DELETE' }), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['content', selectedDomainId] }) });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Card className="mb-6">
        <CardHeader><CardTitle>Domain Management</CardTitle></CardHeader>
        <CardContent className="flex items-center gap-4">
          <Select onValueChange={setSelectedDomainId} value={selectedDomainId || ''}>
            <SelectTrigger className="w-[280px]"><SelectValue placeholder="Select a domain" /></SelectTrigger>
            <SelectContent>{domains?.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}</SelectContent>
          </Select>
          <Button onClick={() => setDomainModal({ open: true, data: null })}>Add Domain</Button>
          {selectedDomain && (
            <>
              <Button variant="outline" onClick={() => setDomainModal({ open: true, data: selectedDomain })}>Edit Domain</Button>
              <Button variant="destructive" onClick={() => deleteDomain.mutate(selectedDomainId!)}>Delete Domain</Button>
            </>
          )}
        </CardContent>
      </Card>

      {selectedDomainId && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Content for {selectedDomain?.name}</CardTitle>
            <Button onClick={() => setContentModal({ open: true, data: null })}>Add Content</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Type</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {contentLoading ? <TableRow><TableCell colSpan={3}>Loading...</TableCell></TableRow> : content?.map(c => (
                  <TableRow key={c.id}>
                    <TableCell>{c.title}</TableCell>
                    <TableCell>{c.type}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => setContentModal({ open: true, data: c })}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteContent.mutate(c.id)}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Dialog open={domainModal.open} onOpenChange={(open) => setDomainModal({ open, data: null })}>
        <DialogContent>
          <DialogHeader><DialogTitle>{domainModal.data ? 'Edit' : 'Add'} Domain</DialogTitle></DialogHeader>
          <DomainForm 
            initialData={domainModal.data} 
            onSubmit={domainModal.data ? updateDomain.mutate : createDomain.mutate} 
            onFinished={() => setDomainModal({ open: false, data: null })}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={contentModal.open} onOpenChange={(open) => setContentModal({ open, data: null })}>
        <DialogContent>
          <DialogHeader><DialogTitle>{contentModal.data ? 'Edit' : 'Add'} Content</DialogTitle></DialogHeader>
          <ContentForm 
            initialData={contentModal.data} 
            domainId={selectedDomainId}
            onSubmit={contentModal.data ? updateContent.mutate : createContent.mutate} 
            onFinished={() => setContentModal({ open: false, data: null })}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
