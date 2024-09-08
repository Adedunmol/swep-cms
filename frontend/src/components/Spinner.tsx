
const Spinner = ({ size }: { size: 'big' | 'small' }) => {
    return (
        <>
            {
                size == 'small' ?
                    <svg className="animate-spin h-5 w-5 border-white border-[5px] border-t-blue-200 rounded-full" viewBox="0 0 24 24" />
                    :
                    size == 'big' ?
                        <>
                            <svg className="animate-spin h-16 w-16 border-blue-300 border-[10px] border-t-blue-900 rounded-full" viewBox="0 0 24 24" />
                        </>
                        :
                        null
            }
        </>
    )
}

export default Spinner