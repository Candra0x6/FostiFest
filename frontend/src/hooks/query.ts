import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

// Types untuk parameter query
type QueryParams = {
    [key: string]: string | number | boolean | null | undefined;
  };
  
  /**
   * Utility untuk memanipulasi query parameters pada URL
   * @param currentQuery - Current query parameters dari URL
   * @param newParams - Parameter baru yang akan ditambahkan/diupdate
   * @returns String query parameters yang sudah diupdate
   */
  export const updateQueryParams = (currentQuery: string, newParams: QueryParams): string => {
    // Parse query string menjadi URLSearchParams object
    const searchParams = new URLSearchParams(currentQuery);
    
    // Iterate setiap parameter baru
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        // Hapus parameter jika value undefined atau null
        searchParams.delete(key);
      } else {
        // Set atau update parameter
        searchParams.set(key, value.toString());
      }
    });
    
    return searchParams.toString();
  };
  
  /**
   * Hook untuk memanipulasi query URL
   * @returns Object berisi fungsi untuk update query
   */
  export const useQueryParams = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
  
    const updateQuery = useCallback((params: QueryParams) => {
      // Get current query string
      const currentQuery = searchParams.toString();
      
      // Generate query string baru
      const newQuery = updateQueryParams(currentQuery, params);
      
          // Update URL dengan query baru
      const url = newQuery ? `${pathname}?${newQuery}` : pathname;
      router.push(url);
    }, [pathname, searchParams, router]);
  
    return { updateQuery };
  };