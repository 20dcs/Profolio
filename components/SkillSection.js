import React from 'react';

const SkillSection = ({ skills }) => {
  return (
    <div>
    <div className=" w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        {[...skills].map((s) => (
          <span
            key={s}
            className='inline-block whitespace-nowrap rounded-[0.27rem]  bg-neutral-800 dark:bg-neutral-50 px-[0.65em] pt-[0.35em] pb-[0.25em] text-center align-baseline text-2xl font-bold leading-none text-neutral-50 dark:text-neutral-600'>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
};
export default SkillSection;
