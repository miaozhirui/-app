
(function(window){
    var LS, noop = function(){}, document = window.document, notSupport = {set:noop,get:noop,remove:noop,clear:noop,each:noop,obj:noop,length:0};
    
    (function(){
        if( "localStorage" in window ){
            try{
                LS = window.localStorage;
                return;
            }catch(e){
            }
        }
        
        var o = document.getElementsByTagName("head")[0], hostKey = window.location.hostname || "localStorage", d = new Date(), doc, agent;
        
        if(!o.addBehavior){
            try{
                LS = window.localStorage;
            }catch(e){
                LS = null;
            }
            return;
        }
        
        try{ 
            agent = new ActiveXObject('htmlfile');
            agent.open();
            agent.write('<s' + 'cript>document.w=window;</s' + 'cript><iframe src="/favicon.ico"></iframe>');
            agent.close();
            doc = agent.w.frames[0].document;
            o = doc.createElement('head');
            doc.appendChild(o);
        }catch(e){
            o = document.getElementsByTagName("head")[0];
        }
        
        try{
            d.setDate(d.getDate() + 36500);
            o.addBehavior("#default#userData");
            o.expires = d.toUTCString();
            o.load(hostKey);
            o.save(hostKey);
        }catch(e){
            return;
        }
        var root, attrs;
        try{
            root = o.XMLDocument.documentElement;
            attrs = root.attributes;
        }catch(e){
            return;
        }
        var prefix = "p__hack_", spfix = "m-_-c",
            reg1 = new RegExp("^"+prefix),
            reg2 = new RegExp(spfix,"g"),
            encode = function(key){ return encodeURIComponent(prefix + key).replace(/%/g, spfix); },
            decode = function(key){ return decodeURIComponent(key.replace(reg2, "%")).replace(reg1,""); };
        LS= {
            length: attrs.length,
            isVirtualObject: true,
            getItem: function(key){
                return (attrs.getNamedItem( encode(key) ) || {nodeValue: null}).nodeValue||root.getAttribute(encode(key)); 
            },
            setItem: function(key, value){
                try{
                    root.setAttribute( encode(key), value);
                    o.save(hostKey);
                    this.length = attrs.length;
                }catch(e){
                }
            },
            removeItem: function(key){
                try{
                    root.removeAttribute( encode(key) );
                    o.save(hostKey);
                    this.length = attrs.length;
                }catch(e){
                }
            },
            clear: function(){
                while(attrs.length){
                    this.removeItem( attrs[0].nodeName );
                }
                this.length = 0;
            },
            key: function(i){
                return attrs[i] ? decode(attrs[i].nodeName) : undefined;
            }
        };
        if( !("localStorage" in window) )
            window.localStorage = LS;
    })();
    
    //二次包装接口
    window.LS = !LS ? notSupport : {
        set : function(key, value){
            if( this.get(key) !== undefined )
                this.remove(key);
            LS.setItem(key, value);
            this.length = LS.length;
        },
        get : function(key){
            var v = LS.getItem(key);
            return v === null ? undefined : v;
        },
        remove : function(key){ LS.removeItem(key);this.length = LS.length; },
        clear : function(){ LS.clear();this.length = 0; },
        each : function(callback){
            var list = this.obj(), fn = callback || function(){}, key;
            for(key in list)
                if( fn.call(this, key, this.get(key)) === false )
                    break;
        },
        obj : function(){
            var list={}, i=0, n, key;
            if( LS.isVirtualObject ){
                list = LS.key(-1);
            }else{
                n = LS.length;
                for(; i<n; i++){
                    key = LS.key(i);
                    list[key] = this.get(key);
                }
            }
            return list;
        },
        length : LS.length
    };
})(window); 