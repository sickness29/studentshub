if (Roles.getAllRoles().count() === 0) {
  Roles.createRole('admin');
  Roles.createRole('student');
  Roles.createRole('teacher');
  Roles.createRole('manager');
}