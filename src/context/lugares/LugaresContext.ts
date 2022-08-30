import { createContext } from "react";
import { Lugares } from "../../interfaces/lugares";

// Aquí creamos una interfaz para poder saber que datos necesitaremos
export interface LugaresContextProps {
    isLoading: boolean;
    userLocation?: [ number, number ];
    lugares: Lugares[],
    busqueda: string,
    rango: string,

    /* 
        Función que hace la petición al api pasandole una query de busqueda
        y retornando un arreglo de todos los lugares
    */
    searchLugaresByQuery: ( query: string, rango: string ) => Promise<Lugares[]>;
    setBusqueda: ( query: string ) => string
    setRango: ( rango: string ) => string
}




// Aquí se crea el Contexto, partiendo de la interfaz anterior y se exporta
export const LugaresContext = createContext<LugaresContextProps>({} as LugaresContextProps)