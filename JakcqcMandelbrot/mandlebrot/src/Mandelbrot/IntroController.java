/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Mandelbrot;

import java.net.URL;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.Tab;
import Mandelbrot.Switchable;

/**
 *
 * @author zasd180
 */
public class IntroController extends Switchable implements Initializable {
    
    
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        
    }
    
    @FXML
    private void changeScene(ActionEvent event){
        Switchable.switchTo("Mandelbrot");
        
        MandelbrotController controller = (MandelbrotController)getControllerByName("Mandelbrot");
    }
    
    
}