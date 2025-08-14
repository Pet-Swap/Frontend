
const DogLoadingIcon = ({ progress = 0, size = 80, className = "" }) => {
    const strokeWidth = 2;
    const radius = size / 2 - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const strokeOffset = circumference - (progress / 100) * circumference;

    return (
        <div className={`relative ${className}`} style={{ width: size, height: size }}>
            {/* Cercle de progression en arrière-plan */}
            <svg
                className="absolute inset-0 -rotate-90"
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
            >
                {/* Cercle de fond */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="none"
                    className="text-gray-200"
                />
                {/* Cercle de progression */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeOffset}
                    strokeLinecap="round"
                    className="text-primary transition-all duration-300 ease-out"
                />
            </svg>

            {/* Icône de chien au centre */}
            <div className="absolute inset-0 flex items-center justify-center">
                <svg
                    width={size * 0.6}
                    height={size * 0.6}
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-primary"
                    style={{
                        opacity: Math.max(0.3, progress / 100),
                        transform: `scale(${0.8 + (progress / 100) * 0.2})`,
                        transition: 'all 0.3s ease-out'
                    }}
                >
                    {/* Tête du chien */}
                    <path
                        d="M12 2C8.5 2 6 4.5 6 8v2c0 1.5 0.5 3 1.5 4L12 18l4.5-4c1-1 1.5-2.5 1.5-4V8c0-3.5-2.5-6-6-6z"
                        fill="currentColor"
                        fillOpacity={Math.min(1, progress / 100)}
                        className="transition-all duration-300"
                    />

                    {/* Oreilles */}
                    <path
                        d="M7 6c-1 0-2 1-2 2v2c0 1 1 2 2 2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeOpacity={Math.min(1, Math.max(0, (progress - 20) / 80))}
                        className="transition-all duration-300"
                    />
                    <path
                        d="M17 6c1 0 2 1 2 2v2c0 1-1 2-2 2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeOpacity={Math.min(1, Math.max(0, (progress - 20) / 80))}
                        className="transition-all duration-300"
                    />

                    {/* Yeux */}
                    <circle
                        cx="10"
                        cy="9"
                        r="1"
                        fill="white"
                        fillOpacity={Math.min(1, Math.max(0, (progress - 40) / 60))}
                        className="transition-all duration-300"
                    />
                    <circle
                        cx="14"
                        cy="9"
                        r="1"
                        fill="white"
                        fillOpacity={Math.min(1, Math.max(0, (progress - 40) / 60))}
                        className="transition-all duration-300"
                    />

                    {/* Nez */}
                    <path
                        d="M12 11c0.5 0 1 0.5 1 1s-0.5 1-1 1-1-0.5-1-1 0.5-1 1-1z"
                        fill="white"
                        fillOpacity={Math.min(1, Math.max(0, (progress - 60) / 40))}
                        className="transition-all duration-300"
                    />

                    {/* Bouche */}
                    <path
                        d="M12 13c-1 1-2 1-2 2"
                        stroke="white"
                        strokeWidth="1"
                        fill="none"
                        strokeOpacity={Math.min(1, Math.max(0, (progress - 80) / 20))}
                        strokeLinecap="round"
                        className="transition-all duration-300"
                    />
                    <path
                        d="M12 13c1 1 2 1 2 2"
                        stroke="white"
                        strokeWidth="1"
                        fill="none"
                        strokeOpacity={Math.min(1, Math.max(0, (progress - 80) / 20))}
                        strokeLinecap="round"
                        className="transition-all duration-300"
                    />
                </svg>
            </div>
        </div>
    );
};

export default DogLoadingIcon;
