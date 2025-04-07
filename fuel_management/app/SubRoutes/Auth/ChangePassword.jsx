import { Form, Button } from '@heroui/react';
import PrimaryButton from '~/Components/PrimayButton';
import TextBoxField from '~/Pages/Login/Components/TextBoxField';
import { useNavigate } from 'react-router';
import useUserUpdatePasswordMutation from '~/Hooks/Auth/useUserUpdatePasswordMutation';
import { addToast } from '@heroui/react';
import useAuth from '~/Hooks/Auth/useAuth';
import { useState } from 'react';

const ChangePassword = () => {
  const navigate = useNavigate();
  const updatePasswordMutation = useUserUpdatePasswordMutation();
  const { onSetClearToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Shows a toast notification.
   *
   * @param {object} params - The toast parameters.
   * @param {string} params.title - The toast title.
   * @param {string} params.color - The toast color.
   * @param {string} params.description - The toast description.
   */
  const showToast = ({
    title = "",
    color = "danger",
    description = "",
  }) => addToast({
    timeout: 3000,
    title: title,
    description: description,
    color: color,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries((new FormData(e.currentTarget)))

    setIsLoading(true);
    updatePasswordMutation.mutate(data, {
      onError: (error) => {
        setIsLoading(false);
        const errorMsg = error.response.data.message
        showToast({
          title: "Error",
          color: "danger",
          description: errorMsg || error.message
        })
      },
      onSuccess: (response) => {
        setIsLoading(false);
        showToast({
          title: "Success",
          color: "success",
          description: response.data.message
        })

        setTimeout(() => {
          //success
          onSetClearToken();
          navigate('/')
        }, 2000)

      }

    })


  }

  return (
    <>
      <section className="h-screen w-screen bg-default-50 flex justify-center items-center">
        <Form onSubmit={handleSubmit} className='flex flex-col items-stretch bg-white w-1/3 border border-default-100 p-4'>
          <span className='text-md font-semibold'>Change Password</span>

          <div className='px-10 flex flex-col'>
            <TextBoxField
              label='Password'
              type="password"
              name="password" />
            <TextBoxField
              type="password"
              label='New Password'
              name="newPassword" />
            <TextBoxField
              type="password"
              label='Confirm Password'
              name="confirmPassword" />
          </div>

          <div className='flex flex-row justify-end pt-10'>

            <Button
              radius='none'
              variant='flat'
              color='ghost'
              onPress={() => navigate(-1)}>
              <span className='text-md font-semibold text-primary'>Close</span>
            </Button>

            <PrimaryButton
              fullWidth={false}
              isLoading={isLoading}
              type="submit"
              label="Save"
              color='primary'
              className="text-white font-semibold text-md"
              title="Save"
            />
          </div>


        </Form>
      </section>
    </>
  )
}

export default ChangePassword; 
