import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  zipCode: string;
  password: string;
  confirmPassword: string;
}

const App = () => {

  const schema: ZodType<FormData> = z.object({
    firstName: z.string().trim().min(2).max(30),
    lastName: z.string().trim().min(2).max(30),
    email: z.string().email().trim().email(),
    age: z.number().positive({message: "No on can possibly be that young!"}).min(18).max(120, {message: "No one can possibly be that old!"}),
    zipCode: z.string().regex(/^\d{5}(?:[-\s]\d{4})?$/, { message: "Must be 5 digit zip. Optional 4 digit extension allowed." }),
    password: z.string().trim().min(5).max(30),
    confirmPassword: z.string().trim().min(5).max(30)
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"]
  });

  const { register, handleSubmit, formState: {errors} } = useForm<FormData>({resolver: zodResolver(schema)});

  const submitForm = (data: FormData) => {
    console.log(data);
  }

  return(
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col bg-emerald-300 rounded p-8 w-96" onSubmit={handleSubmit(submitForm)}>
        <div className="mb-2 flex flex-col">
          <label>First Name:</label>
          <input type="text" {...register("firstName")} />
          {errors.firstName && <span className='text-red-700 text-xs font-semibold mt-1'>{errors.firstName.message}</span>}
        </div>
        <div className="mb-2 flex flex-col">
          <label>Last Name:</label>
          <input type="text" {...register("lastName")} />
          {errors.lastName && <span className='text-red-700 text-xs font-semibold mt-1'>{errors.lastName.message}</span>}
        </div>
        <div className="mb-2 flex flex-col">
          <label>Email:</label>
          <input type="email" {...register("email")} />
          {errors.email && <span className='text-red-700 text-xs font-semibold mt-1'>{errors.email.message}</span>}
        </div>
        <div className="mb-2 flex flex-col">
          <label>Age:</label>
          <input type="number" {...register("age", {valueAsNumber: true})} />
          {errors.age && <span className='text-red-700 text-xs font-semibold mt-1'>{errors.age.message}</span>}
        </div>
        <div className="mb-2 flex flex-col">
          <label>Zip code:</label>
          <input type="string" {...register("zipCode")} />
          {errors.zipCode && <span className='text-red-700 text-xs font-semibold mt-1'>{errors.zipCode.message}</span>}
        </div>
        <div className="mb-2 flex flex-col">
          <label>Password:</label>
          <input type="password" {...register("password")} />
          {errors.password && <span className='text-red-700 text-xs font-semibold mt-1'>{errors.password.message}</span>}
        </div>
        <div className="mb-2 flex flex-col">
          <label>Confirm Password:</label>
          <input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && <span className='text-red-700 text-xs font-semibold mt-1'>{errors.confirmPassword.message}</span>}
        </div>
        <input type="submit" className='bg-white rounded mt-1 cursor-pointer' value="Submit" />
      </form>
    </div>
  );
}

export default App
