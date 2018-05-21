   var iconSelect;
        var selectedText;

        window.onload = function(){
            
            selectedText = document.getElementById('selected-text');
            
            document.getElementById('my-icon-select').addEventListener('changed', function(e){
               selectedText.value = iconSelect.getSelectedValue();
            });
            
            iconSelect = new IconSelect("my-icon-select", 
                {'selectedIconWidth':23,
                'selectedIconHeight':23,
                'selectedBoxPadding':1,
                'iconsWidth':48,
                'iconsHeight':48,
                'boxIconSpace':1,
                'vectoralIconNumber':3,
                'horizontalIconNumber':3});

            var icons = [];
            icons.push({'iconFilePath':'imgs/happy.png', 'iconValue':'1'});
            icons.push({'iconFilePath':'imgs/sad.jpg', 'iconValue':'2'});
            icons.push({'iconFilePath':'imgs/fear.svg', 'iconValue':'3'});
        
            
            iconSelect.refresh(icons);
            


        };

//Put tired here too