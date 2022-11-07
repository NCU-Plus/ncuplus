import { Actions, Permissions } from 'nest-casl';
import { InferSubjects } from '@casl/ability';
import { UserRole } from 'src/user/user.entity';
import { Report } from '../report.entity';

export type Subjects = InferSubjects<typeof Report>;

export const permissions: Permissions<UserRole, Subjects, Actions> = {
  every({ user, can }) {
    can(Actions.create, Report);
    can(Actions.read, Report, {
      reporter: user.id as unknown as number,
    });
  },
};
