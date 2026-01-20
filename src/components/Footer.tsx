import classNames from 'classnames';
import { Filter } from '../App';

interface Props {
  onSelect: (selectedFilter: Filter) => void;
  selectedFilter: Filter;
}

export const Footer: React.FC<Props> = ({ onSelect, selectedFilter }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        3 items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectedFilter === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => onSelect('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selectedFilter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => onSelect('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selectedFilter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onSelect('completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
