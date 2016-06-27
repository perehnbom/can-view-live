/*can-view-live@3.0.0-pre.1#lib/html*/
var live = require('./core.js');
var nodeLists = require('can-view-nodelist');
var makeFrag = require('can-util/dom/frag/frag');
var makeArray = require('can-util/js/make-array/make-array');
var childNodes = require('can-util/dom/child-nodes/child-nodes');
live.html = function (el, compute, parentNode, nodeList) {
    var data;
    parentNode = live.getParentNode(el, parentNode);
    data = live.listen(parentNode, compute, function (ev, newVal, oldVal) {
        var attached = nodeLists.first(nodes).parentNode;
        if (attached) {
            makeAndPut(newVal);
        }
        var pn = nodeLists.first(nodes).parentNode;
        data.teardownCheck(pn);
        live.callChildMutationCallback(pn);
    });
    var nodes = nodeList || [el], makeAndPut = function (val) {
            var isFunction = typeof val === 'function', aNode = live.isNode(val), frag = makeFrag(isFunction ? '' : val), oldNodes = makeArray(nodes);
            live.addTextNodeIfNoChildren(frag);
            oldNodes = nodeLists.update(nodes, childNodes(frag));
            if (isFunction) {
                val(frag.firstChild);
            }
            nodeLists.replace(oldNodes, frag);
        };
    data.nodeList = nodes;
    if (!nodeList) {
        nodeLists.register(nodes, data.teardownCheck);
    } else {
        nodeList.unregistered = data.teardownCheck;
    }
    makeAndPut(compute());
};