import { useSearchParams } from "react-router-dom";
import { useEffect,useState} from "react";

export function useURLPosition(){
    
    const [searchParams, setSearchParams] = useSearchParams();
    const mapLat = searchParams.get("lat");
    const mapLng = searchParams.get("lng");

   

    return {mapLat,mapLng}
}