export const Button = ({ id, onClick, isActive = false }) => {
  const baseClass =
    "w-12 h-12 rounded-lg border cursor-pointer flex items-center justify-center shadow-[0_3px_6px_rgba(0,0,0,0.2)] transition-all duration-150";
  const activeClass = "shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)] translate-y-[1px]";

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${
        isActive ? activeClass : ""
      } active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)] active:translate-y-px `}
    >
      <svg
        width="21"
        height="21"
        className={`${
          isActive ? "fill-current text-orange-400" : "fill-none text-black"
        } active:fill-current active:text-orange-400`}
      >
        <use href={`/assets/spritesheet.svg#icon-${id}`} />
      </svg>
    </button>
  );
};
