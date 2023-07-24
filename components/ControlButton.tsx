type Props = {
  title: string;
  onClick: () => void;
};

const ControlButton = (props: Props) => {
  return (
    <button
      className="flex flex-col items-stretch h-20 w-20 p-2 m-1 text-left rounded-xl overflow-hidden cursor-pointer shadow-xl transition-all bg-gray-600 text-gray-200
                 hover:shadow-lg active:scale-95 active:shadow-xl active:bg-gray-700 active:text-gray-100 md:hover:scale-95 md:active:scale-100 md:hover:bg-gray-500 
                 dark:bg-zinc-800 dark:text-zinc-200 md:dark:hover:bg-zinc-600 dark:active:bg-zinc-700"
      onClick={props.onClick}
    >
      <p className="flex-grow font-medium leading-4 select-none overflow-hidden">
        {props.title}
      </p>
      <p
        className="self-end font-medium leading-3 select-none text-gray-400 
                   dark:text-zinc-400"
      >
      </p>
    </button>
  );
};

export default ControlButton;
