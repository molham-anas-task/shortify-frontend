const Spinner = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <style>
                {`
                    .pulse1 {
                        animation: pulse1 1.5s ease-in-out infinite;
                    }
                    .pulse2 {
                    animation: pulse2 1.5s ease-in-out infinite;
                    }
                    @keyframes pulse1 {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.6; }
                    }
                    @keyframes pulse2 {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    25% { transform: scale(1.1); opacity: 0.6; }
                    }
                `}
            </style>

            <g className="pulse1">
                <path d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0-7.07-7.07L10 5.5" />
            </g>

            <g className="pulse2">
                <path d="M14 11a5 5 0 0 0-7.07 0l-1.41 1.41a5 5 0 0 0 7.07 7.07L14 18.5" />
            </g>
        </svg>
    );
};

export default Spinner;
