import { createClient } from "contentful";
import { useEffect, useState } from "react";

const client = createClient({
    space: 'cd1r9otg4akc',
    environment: 'master',
    accessToken: import.meta.env.VITE_API_KEY,
});

export const useFetchProjects = () => {

    const [loading, setLoading] = useState();
    const [projects, setProjects] = useState([]);

    const getData = async() => {
        try {
            const response = await client.getEntries({content_type:'projects'});
            const projects = response.items.map((item) => {

              const {title, url, img} = item.fields;
              const id = item.sys.id;
              const image = img?.fields?.file?.url;

              return {title, url, id, image};
            })

            setProjects(projects);
            setLoading(false);

        } catch (error) {
            
            setLoading(false);
            throw(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return {loading, projects};
}
