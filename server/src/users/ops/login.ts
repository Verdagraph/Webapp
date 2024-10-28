import { UserLoginCommand } from '@vdt-webapp/common/src/user/mutations';

interface userLoginResult {
	accessToken: string;
	refreshToken: string;
}

const userLogin = async (
	command: typeof UserLoginCommand
): Promise<userLoginResult> => {
	return { accessToken: 'asertn', refreshToken: 'iaenst' };
};
export default userLogin;
