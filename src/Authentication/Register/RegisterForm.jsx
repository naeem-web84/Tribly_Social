import { useForm } from "react-hook-form";
import { Link } from "react-router";

const RegisterForm = ({ onSubmit, error }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
      <h2 className="text-center text-2xl font-bold mb-6">Register</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="form-control">
          <label className="label font-semibold text-secondary-content">Full Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            className="input input-bordered"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label font-semibold text-secondary-content">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="input input-bordered"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label font-semibold text-secondary-content">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="input input-bordered"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="form-control">
          <label className="label font-semibold text-secondary-content">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            className="input input-bordered"
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (value) => value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="form-control md:col-span-2">
          <label className="label font-semibold text-secondary-content">Upload Your Image</label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered"
            {...register("image", { required: "Image is required" })}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
        </div>

        {/* About Me */}
        <div className="form-control md:col-span-2">
          <label className="label font-semibold text-secondary-content">About Me</label>
          <textarea
            placeholder="Tell us about yourself"
            className="textarea textarea-bordered"
            {...register("about", { required: "About field is required" })}
          />
          {errors.about && <p className="text-red-500 text-sm mt-1">{errors.about.message}</p>}
        </div>
      </div>

      {/* Terms */}
      <div className="form-control mt-4">
        <label className="cursor-pointer flex gap-2 items-center">
          <input type="checkbox" {...register("terms")} className="checkbox" />
          <span className="label-text font-semibold">I agree to the Terms & Conditions</span>
        </label>
      </div>

      {/* Server / Firebase error */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="form-control mt-6">
        <button className="btn btn-primary w-full">Register</button>
      </div>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link className="btn btn-link px-0" to="/login">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
