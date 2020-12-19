import {
  useSelect,
  UseSelectState,
  UseSelectStateChangeOptions,
} from 'downshift';
import { Item } from '../../Sidebar/components/ClassroomsMenu';

const classroomsStateReducer = (
  state: UseSelectState<Item>,
  actionAndChanges: UseSelectStateChangeOptions<Item>
) => {
  const { type, changes } = actionAndChanges;

  switch (type) {
    case useSelect.stateChangeTypes.ItemClick:
      return { ...changes, isOpen: true };
    case useSelect.stateChangeTypes.MenuKeyDownEnter:
      return { ...changes, isOpen: true };
    default:
      return changes;
  }
};

const defaultStateReducer = (
  state: UseSelectState<Item>,
  actionAndChanges: UseSelectStateChangeOptions<Item>
) => actionAndChanges.changes;

const getStateReducer = (menu?: string) => {
  return menu === 'classrooms' ? classroomsStateReducer : defaultStateReducer;
};

export default getStateReducer;
