import Category from "../models/Category";
import Sound from "../models/Sound";

import SoundButton from "./SoundButton";

type Props = {
  category: Category;
  onSoundPressed: (sound: Sound) => void;
};

const SoundsCategory = (props: Props) => {
  return (
    <section
      className="flex flex-col w-screen px-5 mb-4 shrink-0 snap-start text-center
                 md:text-left"
    >
      <h3
        className="text-xl px-1 mb-4 font-bold text-gray-400
                   dark:text-zinc-500"
      >
        {props.category.name}
      </h3>

      <div
        className="flex flex-wrap flex-row justify-center content-start
                   md:justify-start"
      >
        {props.category.sounds.map((sound) => (
          <SoundButton
            key={sound.id}
            title={sound.title}
            duration={sound.duration}
            onClick={() => props.onSoundPressed(sound)}
          />
        ))}
      </div>
    </section>
  );
};

export default SoundsCategory;
