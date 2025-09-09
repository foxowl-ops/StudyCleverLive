import { icons } from 'lucide-react';

const DynamicIcon = ({ name, ...props }) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon {...props} />;
};

export default DynamicIcon;