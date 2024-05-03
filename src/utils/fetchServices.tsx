import servicesJson from '../mockData/services.json'

export interface Service {
    name: string,
    price: number,
}


export const fetchServices = async (setServices: (value: React.SetStateAction<Service[]>) => void) => {
    try {
        // Pretend to fetch the services data
        const newServices: Service[] = []

        for (let i = 0; i < servicesJson.services.length; ++i) {
            newServices.push(
                {
                    name: servicesJson.services[i].name,
                    price: servicesJson.services[i].price,
                }
            )
        }

        setServices(newServices)
    } catch (error) {
        console.error('while trying to load services:', error)
    }

}
