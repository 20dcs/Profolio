import React from 'react';
import MockupToolbar from './MockupToolbar';
import Button from './Button';
import Image from 'next/image';
import data from '../data.json';
import GitHub from './icons/GitHub';
import ExternalLink from './icons/ExternalLink';

const Color = `${data.Color}`;
const BColor = `${data.Color}`;

const FeaturedProjectCard = ({
  title,
  status,
  float,
  flexDirection,
  description,
  imgWidth,
  imgHeight,
  imgSrc,
  stack,
  liveLink,
  repoLink,
}) => {
  return (
    <article
      className={`relative flex items-stretch w-full dark:bg-mid bg-light/10 p-3.5 my-4 ${flexDirection} gap-x-3.5 rounded-md`}>
      {/* Project image */}
      <div className='flex flex-col w-full lg:w-7/12 my-auto rounded-md overflow-hidden'>
        <MockupToolbar />
        <Image
          src={imgSrc}
          width={imgWidth}
          height={imgHeight}
          alt={`${title}`}
        />
      </div>

      {/* Project info */}
      <div
        className={`grow flex flex-col relative w-full p-3.5 lg:w-5/12 lg:${float} lg:-translate-x-0 gap-y-2`}>
        <p
          className={`mb-0 tracking-wider small-text`}
          style={{ color: Color }}>
          {status}
        </p>
        <h3>{title}</h3>
        <div className={`w-1/4 h-1 mb-2`} style={{ backgroundColor: BColor }}>
          &nbsp;
        </div>
        <div className='flex flex-wrap mb-2'>
          {stack?.map((stackItem, i) => (
            <p
              key={i}
              className={`ml-2 text-sm sm:text-sm font-semibold tracking-wide opacity-100 normal-case text-center`}>
              {`${stackItem}`}
            </p>
          ))}
        </div>
        <p className='text-sm tracking-wide leading-normal'>{description}</p>
        <div className='flex'>
          {liveLink !== null ? (
            <Button
              link={liveLink}
              text={'Live'}
              square={false}
              icon={<ExternalLink square={false} />}
            />
          ) : null}

          {repoLink !== null ? (
            <Button
              link={repoLink}
              text={'Source'}
              square={false}
              icon={<GitHub square={false} />}
            />
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default FeaturedProjectCard;
