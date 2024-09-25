import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';
 
describe('Sign In', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const onSubmit = jest.fn();
            render(<SignInContainer onSubmit={onSubmit} errorMessage="" />)

            fireEvent.changeText(screen.getByPlaceholderText('Username'), 'James');
            fireEvent.changeText(screen.getByPlaceholderText('Password'), 'Jamison');
            fireEvent.press(screen.getByText('Sign In'));
            
            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);

                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'James',
                    password: 'Jamison',
                });
            });
        });
    });
});