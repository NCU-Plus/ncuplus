import { Actions, Permissions } from 'nest-casl';
import { InferSubjects } from '@casl/ability';
import { Profile } from '../profile.entity';
import { UserRole } from 'src/user/user.entity';

export type Subjects = InferSubjects<typeof Profile>;

export const permissions: Permissions<UserRole, Subjects, Actions> = {
  every({ user, can }) {
    can(Actions.read, Profile);
    // https://github.com/getjerry/nest-casl/pull/222
    can(Actions.update, Profile, {
      user: user.id as unknown as number,
    });
  },
};
