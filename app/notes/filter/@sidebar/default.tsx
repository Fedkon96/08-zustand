import Link from 'next/link';
import css from './SidebarNotes.module.css';

const tagList: string[] = [
  'All notes',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

const SidebarNotes = () => {
  return (
    <ul className={css.menuList}>
      {tagList.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
