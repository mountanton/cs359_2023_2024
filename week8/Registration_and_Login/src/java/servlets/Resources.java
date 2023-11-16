/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import java.util.HashMap;
import mainClasses.Person;

/**
 *
 * @author micha
 */
public class Resources {
    static HashMap<String,Person> registeredUsers=new HashMap<>();
    
    public static void setResources(){
        Person p=new Person("mountanton","123456","basketball","dallas","Greece");
        Person p2=new Person("giannis","ante3434","basketball","bucks","USA");
        Person p3=new Person("tsitsipas","tsip3434","tennis","bucks","Monaco");
        Person p4=new Person("mantalos","mantalos","tennis","dallas","Greece");
        registeredUsers.put(p.getUsername(), p);
        registeredUsers.put(p2.getUsername(), p2);
        registeredUsers.put(p3.getUsername(), p3);
        registeredUsers.put(p4.getUsername(), p4);
     }
}
