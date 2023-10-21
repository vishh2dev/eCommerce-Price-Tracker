"use client"

import { FormEvent, useState } from "react"

const Searchbar = () => {
    const[ searchPrompt,setSearchPrompt] = useState('')
    const[ isLoading,setIsLoading] = useState(false)

    const isValidProductUrl = (url: string) =>{
        try {
            const parsedUrl = new URL(url)
            const hostname = parsedUrl.hostname

            if(hostname.includes('amazon.com') ||
                hostname.includes('amazon.') ||
                hostname.endsWith('amazon')
             ){
                return true
             }
        } catch (error) {
            return false
        }
        return false
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault()

        const isValidLink = isValidProductUrl(searchPrompt)

        if(!isValidLink) return alert('Please provide a valid amazon link')

        try {
            setIsLoading(true)
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }
    return (
        <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={searchPrompt}
                onChange={(e)=>{setSearchPrompt(e.target.value)}}
                placeholder="Enter product link" 
                className="searchbar-input"
            />
            <button  type="submit" className="searchbar-btn" disabled={searchPrompt === ''}>
                {isLoading ? 'searching..' : 'search'}
            </button>
        </form>
    )
}

export default Searchbar
