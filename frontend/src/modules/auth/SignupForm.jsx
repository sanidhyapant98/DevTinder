import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Heart } from 'lucide-react';

export default function SignupForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    bio: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!formData.email.includes('@')) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else {
      const ageNum = Number(formData.age);
      if (Number.isNaN(ageNum)) {
        newErrors.age = 'Age must be a number';
      } else if (ageNum < 18) {
        newErrors.age = 'Must be 18 or older';
      }
    }
    if (!formData.gender) newErrors.gender = 'Gender is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      if (typeof onSubmit === 'function') {
        onSubmit(formData);
      } else if (process.env.NODE_ENV === 'development') {
        console.warn('SignupForm: onSubmit prop is not a function');
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Join MatchMingle</h2>

      {/* Name fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-semibold mb-2">
            <User className="w-4 h-4 inline mr-2" />
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`input-field ${errors.firstName ? 'border-red-500' : ''}`}
            placeholder="John"
            disabled={isLoading}
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
            placeholder="Doe"
            disabled={isLoading}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          <Mail className="w-4 h-4 inline mr-2" />
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`input-field ${errors.email ? 'border-red-500' : ''}`}
          placeholder="you@example.com"
          disabled={isLoading}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          <Lock className="w-4 h-4 inline mr-2" />
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`input-field pr-10 ${errors.password ? 'border-red-500' : ''}`}
            placeholder="••••••••"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            disabled={isLoading}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      {/* Age and Gender */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`input-field ${errors.age ? 'border-red-500' : ''}`}
            placeholder="25"
            min="18"
            disabled={isLoading}
          />
          {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`input-field ${errors.gender ? 'border-red-500' : ''}`}
            disabled={isLoading}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
        </div>
      </div>

      {/* Bio (optional) */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          <Heart className="w-4 h-4 inline mr-2" />
          Bio (Optional)
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="input-field resize-none h-20"
          placeholder="Tell us about yourself..."
          disabled={isLoading}
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Creating account...</span>
          </>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
}