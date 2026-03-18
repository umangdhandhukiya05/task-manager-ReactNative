export const ValidationRules = {
  name: {
    required: 'Name is required',
    minLength: {
      value: 3,
      message: 'Name must be at least 3 characters long',
    },
  },

  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },

  password: {
    required: 'Password required',
    pattern: {
      value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
      message: 'Min 8 character, 1 A-Z, 1 a-z, 1 number, 1 special character',
    },
  },

  title: {
    required: 'Title is required',
    minLength: {
      value: 3,
      message: 'Title must be at least 3 characters long',
    },
  },

  description: {
    required: 'Description is required',
    minLength: {
      value: 8,
      message: 'Description must be at least 8 characters long',
    },
  },

  assignToUser: {
    required: 'AssignToUser is required',
  },

  status: {
    required: 'Status is required',
  },

  priority: {
    required: 'Priority is required',
  },

  dueDate: {
    required: 'DueDate is required',
  },
};

export const DropDownOption = {
  statusDropDown: [
    { label: 'Todo', value: 'todo' },
    { label: 'In Progress', value: 'inProgress' },
    { label: 'Done', value: 'done' },
  ],

  priorityDropDown: [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
  ],
};
