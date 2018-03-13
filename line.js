AFRAME.registerComponent('enable-line-draw', {
    // Metadata
    planeid: 'lineplane',
    lines: [],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },

    // Functionality
    generateLinePath: function() {
        var path = 'path: ';
        path += this.start.x + ' ' + this.start.y + ' ' + 0;
        path += ', ';
        path += this.end.x + ' ' + this.end.y + ' ' + 0;
        return path;
    },
    drawLine: function() {
        var line = document.createElement('a-entity');
        var plane = document.querySelector('#' + this.planeid);
        var path = this.generateLinePath();
        var color = 'color: #ffffff';
        var properties = path + ';' + color;

        line.setAttribute('meshline', properties);
        plane.appendChild(line);
    },
    reset: function() {
        this.start.x = this.start.y = this.end.x = this.end.y = 0;
    },

    // Event handlers
    registerLineStart: function(event) {
        this.reset();

        var point = event.detail.intersection.point;
        this.start.x = point.x;
        this.start.y = -point.z;
    },
    registerLineEnd: function(event) {
        var point = event.detail.intersection.point;
        this.end.x = point.x;
        this.end.y = -point.z;
        
        this.drawLine();
        this.reset();
    },
    registerClick: function(event) {
        document.querySelector('a-sky').setAttribute('color', '#ffffff');
    },

    // Initialize event listeners for line drawing
    init: function() {
        this.el.addEventListener('click', this.registerClick.bind(this));
        this.el.addEventListener('mousedown', this.registerLineStart.bind(this));
        this.el.addEventListener('mouseup', this.registerLineEnd.bind(this));
    }
});