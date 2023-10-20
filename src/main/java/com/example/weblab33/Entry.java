package com.example.weblab33;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
public class Entry implements Serializable {

    @Id
    @SequenceGenerator(name = "jpaSequence", sequenceName = "JPA_SEQUENCE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jpaSequence")
    private int id;

    private Double xValue;
    private Double yValue;
    private Double rValue;
    private String hitResult;
    private Double responseTime;

    public Entry() { }

    private boolean checkTriangle() {
        return xValue >= 0 && yValue <= 0 && xValue - yValue <= rValue;
    }

    private boolean checkRectangle() {
        return xValue <= 0 && yValue <= 0 && Math.abs(xValue) <= rValue / 2 && Math.abs(yValue) <= rValue;
    }

    private boolean checkCircle() {
        return xValue <= 0 && yValue >= 0 && xValue * xValue + yValue * yValue <= (double)rValue * rValue;
    }

    public void checkHit() {
        hitResult = checkTriangle() || checkRectangle() || checkCircle() ? "Попадание" : "Промах";
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Double getxValue() {
        return xValue;
    }

    public void setxValue(Double xValue) {
        this.xValue = Math.round(xValue * 1000.0) / 1000.0;
    }

    public Double getyValue() {
        return yValue;
    }

    public void setyValue(Double yValue) {
        this.yValue = Math.round(yValue * 1000.0) / 1000.0;
    }

    public Double getrValue() {
        return rValue;
    }

    public void setrValue(Double rValue) {
        this.rValue = Math.round(rValue * 1000.0) / 1000.0;
    }

    public String getHitResult() {
        return hitResult;
    }

    public void setHitResult(String hitResult) {
        this.hitResult = hitResult;
    }

    public Double getResponseTime() {
        return responseTime;
    }

    public void setResponseTime(Double responseTime) {
        this.responseTime = responseTime;
    }


    public boolean IsValid() {
        return rValue != null && yValue != null && rValue >= 2 && rValue <= 5 && yValue >= -5 && yValue <= 3;
    }


    @Override
    public String toString() {
        return "Entry{" +
                "xValue=" + xValue +
                ", yValue=" + yValue +
                ", rValue=" + rValue +
                ", hitResult=" + hitResult +
                '}';
    }

    @Override
    public int hashCode() {
        return xValue.hashCode() + yValue.hashCode() +
                rValue.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj instanceof Entry) {
            Entry entryObj = (Entry) obj;
            return xValue.equals(entryObj.getxValue()) &&
                    yValue.equals(entryObj.getyValue()) &&
                    rValue.equals(entryObj.getrValue());
        }
        return false;
    }
}
