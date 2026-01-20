/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoadingError, setTodosLoadingError] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<Filter>('all');

  const setFilter = (method: Filter) => {
    setSelectedFilter(method);
  };

  const visibleTodos = useCallback(
    (method: Filter) => {
      let filteredTodos = todos;

      if (method !== 'all') {
        filteredTodos = filteredTodos.filter(todo =>
          method === 'completed' ? todo.completed : !todo.completed,
        );
      }

      return filteredTodos;
    },
    [todos],
  );

  const todosCounter = () => {
    return todos.filter(todo => !todo.completed).length;
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setTodosLoadingError(true);
        setTimeout(() => {
          setTodosLoadingError(false);
        }, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={visibleTodos(selectedFilter)} />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <Footer
            todosCounter={todosCounter}
            onSelect={method => setFilter(method)}
            selectedFilter={selectedFilter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !todosLoadingError },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {todosLoadingError && <>Unable to load todos</>}
        {false && (
          <>
            <br />
            Title should not be empty
            <br />
            Unable to add a todo
            <br />
            Unable to delete a todo
            <br />
            Unable to update a todo
          </>
        )}
      </div>
    </div>
  );
};
