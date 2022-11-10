import { createContext } from "react";

import { Marker } from 'mapbox-gl'

import { Lugares } from "../../interfaces/lugares";

// Aquí creamos una interfaz para poder saber que datos necesitaremos
export interface AdvancedSearchContextProps {
    isLoading: boolean;
    lugares: Lugares[];
    markers: Marker[];
    

    /* 
        Función que hace la petición al api pasandole una query de busqueda
        y retornando un arreglo de todos los lugares
    */
    searchLugares: ( data: Lugares ) => Promise<Lugares[]>;
}

// Aquí se crea el Contexto, partiendo de la interfaz anterior y se exporta
export const AdvancedSearchContext = createContext<AdvancedSearchContextProps>({} as AdvancedSearchContextProps)