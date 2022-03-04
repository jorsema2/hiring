import "./Sidebar.css";

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className="sidebar">
      <h3>Countries</h3>
      <div className="countries-list">{children}</div>
    </div>
  );
};

export default Sidebar;
