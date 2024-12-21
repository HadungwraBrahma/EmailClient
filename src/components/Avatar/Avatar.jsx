import '../../styles/Avatar.css';

const Avatar = ({ name, size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'avatar-small',
    medium: 'avatar-medium',
    large: 'avatar-large'
  };

  return (
    <div className={`avatar ${sizeClasses[size]} ${className}`}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

export default Avatar;