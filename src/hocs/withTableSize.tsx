import React, {
    SyntheticEvent,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

interface parrentSize {
    width: number | null;
    height: number | null;
}
const TABLE_HEADER_HEIGHT = 55;
const TABLE_FOOTER_HEIGHT = 55;
const withTableSize = (Component: React.FC<any>) => (props: any) => {
    const [parrentSize, setParentSize] = useState<parrentSize | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useLayoutEffect(() => {
        handleResize();
    }, [containerRef]);

    const handleResize = () => {
        const parent = containerRef.current;
        if (parent) {
            const { height, width } = parent.getBoundingClientRect();
            setParentSize({
                width,
                height: height - TABLE_HEADER_HEIGHT - TABLE_FOOTER_HEIGHT,
            });
        }
    };

    return (
        <div ref={containerRef} className='tw-h-full tw-w-full'>
            <Component {...props} parrentSize={parrentSize} />
        </div>
    );
};

export default withTableSize;
