/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mainClasses;

/**
 *
 * @author mountant
 */
public class Person {

    String message;

    public Person(String username, String password, String sport, String team, String country) {
        this.username = username;
        this.password = password;
        this.sport = sport;
        this.team = team;
        this.country=country;
    }
    String username, password;
    String sport;
    String team;
    String favouritePlayer;
    String country;

    public String getSport() {
        return sport;
    }

    public void setValues() {
        if ("tennis".equals(sport)) {
            favouritePlayer = "Tsitsipas";
        } else if ("dallas".equals(team)) {
            favouritePlayer = "Nowitzki";
        } else if ("bucks".equals(team)) {
            favouritePlayer = "Antetokounmpo";
        }
        if ("Greece".equals(country)) {
            message = "Geia sou " + username;
        } else {
            message = "Hi " + username;
        }
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setSport(String sport) {
        this.sport = sport;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getFavouritePlayer() {
        return favouritePlayer;
    }

    public void setFavouritePlayer(String favouritePlayer) {
        this.favouritePlayer = favouritePlayer;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
