import "./Sidebar.css";

type SidebarProps = {
  children: React.ReactNode;
};

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className="sidebar">
      <h2>Cities App</h2>
      <div>{children}</div>
    </div>
  );
};
