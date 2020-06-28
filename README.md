# sudoku.com-solver
Sudoku Solver that integrates with sudoku.com

[Solver Demo](https://jim3692.github.io/sudoku.com-solver/demo/)

# Setup for sudoku.com

#### Warning! Script Injector does not exist in Chrome Web Store anymore.
The script can also be loaded from Chrome, or Firefox, console with this call:
```js
fetch('https://cdn.jsdelivr.net/gh/jim3692/sudoku.com-solver/build/sudoku.com-bundle.js').then(res => res.text()).then(js => eval(js))
```

1. Install [Script Injector]( https://chrome.google.com/webstore/detail/script-injector/ndndddaojfijpbgnjbgeledkmlfaekba) to Chrome
2. Add `https://cdn.jsdelivr.net/gh/jim3692/sudoku.com-solver/build/sudoku.com-bundle.js` to the Script Injector scripts list
    
    <image src="https://raw.githubusercontent.com/jim3692/sudoku.com-solver/master/setup_assets/add_link_1.png" />
    <image src="https://raw.githubusercontent.com/jim3692/sudoku.com-solver/master/setup_assets/add_link_2.png" />
    
3. Navigate to <https://sudoku.com> and set difficulty to anything but Expert
4. Use Script Injector to inject the script
    
    ![https://raw.githubusercontent.com/jim3692/sudoku.com-solver/master/setup_assets/inject_script.png](https://raw.githubusercontent.com/jim3692/sudoku.com-solver/master/setup_assets/inject_script.png)
    
5. Click the "Solve" button that appears at the top of the page
    
    ![](https://raw.githubusercontent.com/jim3692/sudoku.com-solver/master/setup_assets/solve.png)
    
6. Observe...
