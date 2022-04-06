const SidebarItem = ({ Icon, title }) => {
  return (
    <li className="flex items-center">
      <Icon className="mr-4" />
      <span>{title}</span>
    </li>
  );
};

export default SidebarItem;
