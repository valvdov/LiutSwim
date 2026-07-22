'use client';

// Shares the "selected service" between the Services slider and the Register
// form (server sections in between stay server-rendered as children).
import React, {createContext, useContext, useState} from 'react';

const ServiceContext = createContext({selectedService: '', setSelectedService: () => {}});

export function ServiceProvider({children}) {
    const [selectedService, setSelectedService] = useState('');
    return (
        <ServiceContext.Provider value={{selectedService, setSelectedService}}>
            {children}
        </ServiceContext.Provider>
    );
}

export function useSelectedService() {
    return useContext(ServiceContext);
}
