import Link from 'next/link';

import { useAuthContext } from '@context/auth-context';
import { images } from '@utils/constants';

import { Form, InputField } from '../FormControl';
import Img from '@components/UI/Image';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

import VerifyEmail from '../VerifyEmaiForm/VerifyEmailModal';
import { TitlePrimary } from '@components/UI/Title';
import { email, password } from '../FormControl/validate';
import { info_recipeform } from '../FormControl/info';

function LoginForm({ onSubmit }) {
	const { errors, setErrors } = useAuthContext();
	const {
		handleSubmit,
		register,
		formState: { errors: formError, isSubmitting },
		setError,
		reset,
	} = useForm();

	useEffect(() => {
		errors?.login?.email &&
			setError('login.email', {
				type: 'custom',
				message: errors?.login?.email,
			});

		errors?.login?.password &&
			setError('login.password', {
				type: 'custom',
				message: errors?.login?.password,
			});
	}, [errors]);

	useEffect(() => {
		setErrors(null);
		reset();
	}, []);

	return (
		<>
			<div className="flex justify-center items-center md:mb-5 mb-7">
				<TitlePrimary title="Login" />
				<Img
					alt="login_icon"
					src={images.icon1}
					className="md:w-20 md:h-20 w-16 h-16"
				/>
			</div>
			<VerifyEmail />

			<Form onSubmit={handleSubmit(({ login }) => onSubmit(login))}>
				<InputField
					label="Email"
					name="login.email"
					type="email"
					placeholder="Enter your email"
					register={register}
					rules={email}
					error={formError?.login?.email}
					required
					icon={<MdEmail />}
				/>

				<InputField
					label="Password"
					name="login.password"
					type="password"
					placeholder="Enter your password"
					register={register}
					error={formError?.login?.password}
					required
					icon={<RiLockPasswordFill />}
					rules={password}
					info={{
						content: info_recipeform.password,
					}}
				/>

				<Link
					href="/resetpassword"
					className="text-[12px] font-medium text-black transition-all duration-300 hover:text-primaryDark relative -top-[3px] mb-8 mt-1 hover:underline hover:italic"
				>
					Forgot your password?
				</Link>
				<Button
					className="primary lg w-full"
					type="submit"
					disabled={isSubmitting}
				>
					{isSubmitting && <Loader type="submitting" />}
					Login
				</Button>
			</Form>

			<p className="text-center mt-5 text-lg">
				New cuisinier?
				<Link
					href="/signup"
					className="ml-2 underline font-medium text-primaryDark"
				>
					Create an account
				</Link>
			</p>
		</>
	);
}

export default LoginForm;
