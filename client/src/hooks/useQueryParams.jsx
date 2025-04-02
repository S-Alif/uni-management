import { useMemo } from "react";
import { useSearchParams } from "react-router";


const useQueryParams = (params = []) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const updateParams = (param, value) => {
        setSearchParams((prev) => {
            return {...Object.fromEntries(prev), [param]: value}
        })
    }

    return useMemo(() => {
        const values = {}

        params.forEach((param) => {
            const value = searchParams.get(param) || null
            if(value) {
                values[param] = value
            }
        })

        return { values, updateParams }
    }, [searchParams, params])
}

export default useQueryParams