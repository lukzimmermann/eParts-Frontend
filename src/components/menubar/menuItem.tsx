type Props = {
  id: number;
  icon?: string;
  title: string;
  isActive?: boolean;
  onClick?: (id: number) => void;
};

function MenuItem({ id, icon, title, isActive, onClick }: Props) {
  const baseClass = `flex items-center h-11 my-1 rounded-full select-none cursor-pointer
     active:bg-[var(--primary-color-press)] 
     transition-colors duration-150`;
  const hoverClass = `hover:bg-[var(--primary-color-hover)]`;
  const activeClass = "bg-[var(--primary-color)]";

  return (
    <div
      className={
        isActive ? `${baseClass} ${activeClass}` : `${baseClass} ${hoverClass}`
      }
      onClick={() => onClick(id)}
    >
      <i className={`pi ml-5 mr-3 cursor-pointer ${icon}`} />
      <label className="cursor-pointer">{title}</label>
    </div>
  );
}

export default MenuItem;
