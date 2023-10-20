package com.example.weblab33;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.context.SessionScoped;
import jakarta.enterprise.inject.Model;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;

import java.io.Serializable;
import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

@Model
@SessionScoped
public class EntriesBean implements Serializable {
    private Entry entry;
    private List<Entry> entries;

    private Connection connection;

    public EntriesBean() {
        entry = new Entry();
        entries = new ArrayList<>();
        establishConnection();
        loadEntries();
    }

    private void establishConnection() {
        try {
            Class.forName("org.postgresql.Driver");
            connection = DriverManager.getConnection(
                    "jdbc:postgresql://localhost:5432/studs",
                    "",
                    "");
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }

    private void loadEntries() {
        entries.clear();
        try {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM entry");
            while (resultSet.next()) {

                Entry entry = new Entry();
                entry.setxValue(resultSet.getDouble("xValue"));
                entry.setyValue(resultSet.getDouble("yValue"));
                entry.setrValue(resultSet.getDouble("rValue"));
                entry.setHitResult(resultSet.getString("hitresult"));
                entry.setResponseTime(resultSet.getDouble("responsetime"));
                entry.checkHit();
                entries.add(entry);
            }
            resultSet.close();
            statement.close();
            entry = new Entry();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    public String addEntry() {
        System.out.println("-------Adding Entry--------");
        if (entry.IsValid()) {
            System.out.println("------Valid Entry--------");
            try {
                PreparedStatement statement = connection.prepareStatement(
                        "INSERT INTO Entry(xValue, yValue, rValue, hitresult, responsetime) VALUES (?, ?, ?, ?, ?)");

                double cur = (double) System.nanoTime() / 1000000;
                entry.checkHit();

                statement.setDouble(1, entry.getxValue());
                statement.setDouble(2, entry.getyValue());
                statement.setDouble(3, entry.getrValue());
                statement.setString(4, entry.getHitResult());

                double responseTime = (double) System.nanoTime() / 1000000 - cur;
                statement.setDouble(5, responseTime);

                entry.setResponseTime(responseTime);

                statement.executeUpdate();
                statement.close();
                entries.add(entry);
                entry = new Entry();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        else {
            return "goToInvalidData";
        }
        return "redirect";
    }

    public String clearEntries() {
        try {
            PreparedStatement statement = connection.prepareStatement("DELETE FROM Entry");
            statement.executeUpdate();
            statement.close();
            entries.clear();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return "redirect";
    }

    public Entry getEntry() {
        return entry;
    }

    public void setEntry(Entry entry) {
        this.entry = entry;
    }

    public List<Entry> getEntries() {
        return entries;
    }
}
