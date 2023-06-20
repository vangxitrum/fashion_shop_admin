import { Link, useNavigate } from 'react-router-dom';
const _404 = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h3>
                sorry, your finding page is not availablle now, go to home page?
            </h3>
            <Link to={'/'} className='tw-text-blue-500 px-4 py-2 tw-rounded'>
                Go to HomePage!
            </Link>
            <button
                onClick={() => navigate(-1)}
                className='tw-text-blue-500 px-4 py-2 tw-rounded'
            >
                Go Back!
            </button>
        </div>
    );
};
export default _404;
