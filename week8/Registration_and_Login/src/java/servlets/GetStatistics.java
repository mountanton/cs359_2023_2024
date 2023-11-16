/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import com.google.gson.JsonObject;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

/**
 *
 * @author micha
 */
public class GetStatistics extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String type=request.getParameter("type");
        JsonObject jo = new JsonObject();
        if(type.equals("users")){
            int activeUsers=(int) request.getServletContext().getAttribute("activeUsers");
            int inactiveUsers=Resources.registeredUsers.size()-activeUsers;
            jo.addProperty("Inactive (Registered) Users",""+ inactiveUsers);
            jo.addProperty("Active Users",""+activeUsers);
            String json = jo.toString();//personToJSON(p);
            response.setStatus(200);
            response.getWriter().write(json);
        }
        else if(type.equals("countries")){
            HashMap<String,Integer> countries=new HashMap<>();
            for(String user:Resources.registeredUsers.keySet()){
                String country=Resources.registeredUsers.get(user).getCountry();
                if(countries.containsKey(country)){
                    countries.put(country, countries.get(country)+1);
                }
                else{
                    countries.put(country,1);
                }
            }
            for(String x:countries.keySet()){
                jo.addProperty(x, countries.get(x)+"");
            }
             String json = jo.toString();//personToJSON(p);
            response.setStatus(200);
            response.getWriter().write(json);
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        //   processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
