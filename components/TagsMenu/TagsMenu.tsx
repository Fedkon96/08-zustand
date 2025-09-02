'use client';

import css from './TagsMenu.module.css';
import { TfiArrowCircleDown } from 'react-icons/tfi';

import Link from 'next/link';
import { useState, useRef } from 'react';

const tagList: string[] = [
  'All notes',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const toggle = () => setIsOpen(!isOpen);

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <div
      className={css.menuContainer}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <button onClick={toggle} className={css.menuButton}>
        Notes <TfiArrowCircleDown className={css.arrow} />
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tagList.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                onClick={toggle}
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
